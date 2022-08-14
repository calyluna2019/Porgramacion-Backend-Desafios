import { serve } from "https://deno.land/std@0.152.0/http/server.ts";
const colorArrays = [];
const requestHandler = (req) => {
    const { pathname } = new URL(req.url);
    switch(pathname) {
        case '/colores':
            return new Response(localStorage.getItem('colores'));   
        case '/colores-random':
            const url = new URL(req.url)
            const color = url.searchParams.get('color')
            colorArrays.push(color);
            localStorage.setItem('colores', colorArrays)
            return new Response("color agregado!!")
        default:
            return new Response("Ruta no válida")
    }
}

serve(requestHandler, {port: 8080})
