import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)

Deno.serve(async (req) => {
  try {
    const payload = await req.json()
    const inviteRecord = payload.record

    const { data: workspaceData, error: workspaceError } = await supabase
      .from('workspaces')
      .select('name')
      .eq('id', inviteRecord.workspace_id)
      .single()

    if (workspaceError) {
        throw new Error("Failed to fetch workspace name: " + workspaceError.message)
    }

    const workspaceName = workspaceData.name

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: { name: "PromptSpace", email: "abdullahsawan19@gmail.com" },
        to: [{ email: inviteRecord.email }],
        subject: ` You're invited to collaborate in ${workspaceName}`,
        htmlContent: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Workspace Invitation</title>
            </head>
          <body style="margin: 0; padding: 0; background-color: #f4f7f6; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
            
            <div style="display: none; max-height: 0px; overflow: hidden;">
              Join ${workspaceName} on PromptSpace and start collaborating.
            </div>

            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f7f6;">
              <tr>
                <td align="center" style="padding: 40px 10px;">
                  
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.07);">
                    
                    <tr>
                      <td align="center" style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); padding: 40px 20px;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 800; letter-spacing: -1px; text-transform: uppercase;">
                          Prompt<span style="opacity: 0.7;">Space</span>
                        </h1>
                      <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 16px;">Where Intelligence Collaborates</p>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding: 40px 30px;">
                        <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 24px; font-weight: 700; line-height: 1.3;">
                          Hello ,<br/>
                          You've landed an invitation!
                        </h2>
                        <p style="margin: 0 0 30px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                          Great things happen when we work together. You've been invited to join a dedicated workspace on PromptSpace to collaborate with your team.
                        </p>

                        <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 25px; margin-bottom: 35px;">
                          
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td valign="top" width="40" style="padding-top: 2px;">
                              </td>
                              <td style="padding-bottom: 15px;">
                                <div style="color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 3px;">Workspace</div>
                                <div style="color: #111827; font-size: 18px; font-weight: 600;">${workspaceName}</div>
                              </td>
                            </tr>
                            <tr>
                              <td colspan="2" style="padding: 5px 0 15px 0;"><div style="border-bottom: 1px solid #e5e7eb; width: 100%;"></div></td>
                            </tr>
                            <tr>
                              <td valign="top" width="40" style="padding-top: 2px;">
                              </td>
                              <td>
                                <div style="color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 3px;">Your Role</div>
                                <div style="color: #111827; font-size: 18px; font-weight: 600; text-transform: capitalize;">${inviteRecord.role}</div>
                              </td>
                            </tr>
                          </table>

                        </div>

                        <div style="text-align: center; margin-bottom: 20px;">
                          <a href="prompt-space-phi.vercel.app/accept-invite?email=${inviteRecord.email}&workspace=${inviteRecord.workspace_id}" 
                             style="display: inline-block; background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); color: #ffffff; padding: 16px 35px; border-radius: 50px; font-size: 16px; font-weight: 700; text-decoration: none; box-shadow: 0 4px 14px rgba(79, 70, 229, 0.4);">
                             Accept Your Invitation
                          </a>
                        </div>
                        
                        <p style="margin: 30px 0 0 0; text-align: center; font-size: 14px; color: #9ca3af;">
                          (or copy & paste: prompt-space-phi.vercel.app )
                        </p>

                      </td>
                    </tr>

                    <tr>
                      <td style="padding: 0 30px 40px 30px;">
                        <div style="border-top: 1px solid #eaeaea; padding-top: 30px; text-align: center;">
                           <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.5;">
                            If you weren't expecting this, you can safely ignore this email. Someone probably just mistyped an email address.
                          </p>
                          <p style="margin: 20px 0 0 0; font-size: 12px; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px;">
                            © 2026 PromptSpace AI Platform
                          </p>
                        </div>
                      </td>
                    </tr>

                  </table>

                  </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      }),
    })

    const data = await res.json()
    return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } })

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: { "Content-Type": "application/json" } })
  }
})