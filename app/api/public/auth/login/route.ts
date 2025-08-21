/* 
    Redirige a la URL de login
*/

import { redirect } from "next/navigation";
import { buildSSOURL } from "../../../../../lib/urls";

export async function GET() {
    const url = buildSSOURL('login');

    return redirect(url);
}