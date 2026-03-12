import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { hashPassword } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// Gerar código de 6 dígitos
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json()

    // Validação
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Verificar se usuário já existe
    const { data: existingUser } = await supabase
      .from('users')
      .select('id, email_verified, username')
      .or(`email.eq.${email},username.eq.${username}`)
      .single()

    if (existingUser) {
      if (existingUser.email_verified) {
        // Se já tem conta verificada, não permite criar outra
        if (existingUser.username === username) {
          return NextResponse.json(
            { error: 'Username already taken' },
            { status: 400 }
          )
        }
        return NextResponse.json(
          { error: 'Email already registered. Please login.' },
          { status: 400 }
        )
      }
      // Se existe mas não verificou, permite reenviar código
      console.log('⚠️ User exists but not verified, allowing re-registration')
    }

    // Hash da senha
    const hashedPassword = await hashPassword(password)

    // Criar ou atualizar usuário (não verificado ainda)
    const { data: newUser, error: userError } = await supabase
      .from('users')
      .upsert({
        username,
        email,
        password: hashedPassword,
        email_verified: false,
        two_factor_enabled: false,
        wallet_configured: false
      }, {
        onConflict: 'email'
      })
      .select()
      .single()

    if (userError) {
      console.error('Supabase error:', userError)
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      )
    }

    // Gerar código de verificação
    const code = generateVerificationCode()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutos

    // Salvar código no banco
    const { error: codeError } = await supabase
      .from('verification_codes')
      .insert({
        email,
        code,
        type: 'registration',
        expires_at: expiresAt.toISOString()
      })

    if (codeError) {
      console.error('Failed to save verification code:', codeError)
      return NextResponse.json(
        { error: 'Failed to generate verification code' },
        { status: 500 }
      )
    }

    // Enviar email com código
    console.log('📧 Attempting to send verification email to:', email)
    console.log('📧 Verification code:', code)
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      console.log('📧 Email API URL:', `${baseUrl}/api/auth/send-verification`)
      
      const emailResponse = await fetch(`${baseUrl}/api/auth/send-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, username })
      })

      const emailData = await emailResponse.json()
      console.log('📧 Email API response:', emailData)
      
      let emailSent = false
      
      if (!emailResponse.ok || emailData.error || emailData.isTestMode) {
        console.error('❌ Failed to send verification email:', emailData)
        emailSent = false
      } else {
        console.log('✅ Verification email sent successfully to:', email)
        emailSent = true
      }

      // Retornar código em dev mode ou se email falhou
      const shouldShowCode = process.env.NODE_ENV === 'development' || !emailSent

      return NextResponse.json({
        success: true,
        message: emailSent 
          ? 'Verification code sent to your email' 
          : 'Email sending limited in test mode. Use the code shown below.',
        email,
        requiresVerification: true,
        devCode: shouldShowCode ? code : undefined,
        emailSent
      })
    } catch (emailError) {
      console.error('❌ Email sending error:', emailError)
      
      // Se falhou, retornar código para o usuário poder continuar
      return NextResponse.json({
        success: true,
        message: 'Email service unavailable. Use the code shown below.',
        email,
        requiresVerification: true,
        devCode: code,
        emailSent: false
      })
    }

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
