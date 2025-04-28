/* 
    Tiene que ser una autenticacion en 2 pasos. Primero se debe setear la cookie y luego redirigir a la pagina de dashboard.
    El problema es que no se puede hacer todo junto, ya que el redirect no acepta mandar cookies porque el navegador no las acepta inmediatamente.
    Osea, si le pongo la cookie la mismo tiempo de enviarlo a /dashboard, no lo reconoce y me envia al login de vuelta
    Es por eso que uso un html con un redirect, para que el navegador lo reconozca y le de tiempito a la cookie de ser seteada.
    En el html le pongo un script que redirige a la pagina de dashboard, para que no quede en blanco.
*/

export async function GET(request: Request) {
    const searchParams = new URL(request.url).searchParams;
    const access_token = searchParams.get('access_token') as string; // get access_token from query params

    if (!access_token) {
        return new Response(JSON.stringify({ error: 'Missing access_token' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Create a custom redirect response with the Set-Cookie header
    const redirectUrl = new URL('/dashboard', request.url);
    
    // Create a two-step redirect response
    return new Response(
        `
        <!DOCTYPE html>
        <html>
        <head>
            <meta http-equiv="refresh" content="0;url=${redirectUrl}">
            <title>Redirecting...</title>
        </head>
        <body>
            <p>Redirecting to dashboard...</p>
            <script>
                window.location.href = "${redirectUrl}";
            </script>
        </body>
        </html>
        `,
        {
            status: 200,
            headers: {
                'Content-Type': 'text/html',
                "Set-Cookie": `token=${access_token}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=7776000`,
            },
        }
    );
}