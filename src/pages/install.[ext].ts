import type { APIRoute, GetStaticPaths } from "astro";

export const getStaticPaths: GetStaticPaths = () => {
  return [
    { params: { ext: "sh" } },
    { params: { ext: "ps1" } },
    { params: { ext: "ts" } },
  ];
};

export const GET: APIRoute = async ({ params }) => {
  const { ext } = params;
  const INSTALL_SCRIPT =
    `https://raw.githubusercontent.com/tristanisham/zvm/refs/heads/master/install.${ext}`;
  if (ext === "ts" || ext === "sh" || ext === "ps1") {
    const resp = await fetch(INSTALL_SCRIPT);
    if (!resp.ok) {
      return new Response(INSTALL_SCRIPT, { status: 404 });
    }

    const script = await resp.text();
    let contentType = "";

    if (ext === "sh") {
      contentType = "text/x-shellscript";
    } else if (ext === "ps1") {
      contentType = "text/plain";
    } else {
      contentType = "text/typescript";
    }

    return new Response(script, {
      status: 200,
      headers: { "Content-Type": `${contentType}; charset=utf-8` },
    });
  } else {
    return new Response("unsupported installation file type", {
      status: 404,
    });
  }
};
