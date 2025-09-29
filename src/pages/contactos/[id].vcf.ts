import type { APIRoute, GetStaticPaths } from "astro";
import { data } from "../../data/personas";

export const getStaticPaths: GetStaticPaths = async () => {
  return data.map((persona) => ({
    params: { id: persona.id },
  }));
};

export const GET: APIRoute = async ({ params }) => {
  const persona = data.find(p => p.id === params.id);
  if (!persona) {
    return new Response("Not found", { status: 404 });
  }

  const vcard = `BEGIN:VCARD
VERSION:3.0
N:${persona.apellido};${persona.nombre}
FN:${persona.nombre} ${persona.apellido}
TITLE:${persona.puesto}
TEL;TYPE=CELL:${persona.celular}
EMAIL:${persona.correo}
END:VCARD`;

  return new Response(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": "inline; filename=contacto.vcf"
    }
  });
};