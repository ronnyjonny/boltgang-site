// pages/api/order.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false, // use formidable for multipart/form-data
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const form = formidable({
    multiples: true,
    keepExtensions: true,
    allowEmptyFiles: true, 
    minFileSize: 0,     // IMPORTANT: lets us submit even with no files
  });
  // Debug: log formidable options so we can verify allowEmptyFiles/minFileSize
  console.log("FORMIDABLE OPTIONS >>>", (form as any).options);

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ error: "Error parsing form" });
    }

    try {
      const f = fields as any;

      const {
        name,
        email,
        phone,
        company,
        orderType,
        dtfSizes,
        dtfNotes,
        garmentType,
        color,
        sizeSmall,
        sizeMedium,
        sizeLarge,
        sizeXL,
        size2XL,
        size3XL,
        designPlacementInstructions,
        dueDate,
        notes,
      } = f;

      const placements = f.placements;

      const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true, // ✅ required for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

      // Handle uploaded files (if any)
      const rawFiles = (files.files || []) as any;
      const fileArray = Array.isArray(rawFiles) ? rawFiles : [rawFiles];

      const attachments = fileArray
        .filter((file) => file && file.filepath)
        .map((file) => ({
          filename: file.originalFilename || "file",
          path: file.filepath,
        }));

      const lines: string[] = [];

      lines.push("New Bolt Gang Printing Order");
      lines.push("====================================");
      lines.push("");
      lines.push(`Name: ${name || ""}`);
      lines.push(`Email: ${email || ""}`);
      lines.push(`Phone: ${phone || ""}`);
      lines.push(`Business / Team: ${company || ""}`);
      lines.push("");
      lines.push(`Order Type: ${orderType || ""}`);
      lines.push("");
      lines.push("DTF Gang Sheets:");
      lines.push(`  Sizes: ${dtfSizes || ""}`);
      lines.push(`  Notes: ${dtfNotes || ""}`);
      lines.push("");
      lines.push("Custom Apparel:");
      lines.push(`  Garment Type: ${garmentType || ""}`);
      lines.push(`  Color: ${color || ""}`);
      lines.push(
        `  Quantities - S: ${sizeSmall || 0}, M: ${sizeMedium || 0}, L: ${
          sizeLarge || 0
        }, XL: ${sizeXL || 0}, 2XL: ${size2XL || 0}, 3XL: ${size3XL || 0}`
      );
      lines.push("");
      lines.push("Placements:");
      if (placements) {
        const placementList = Array.isArray(placements) ? placements : [placements];
        placementList.forEach((p: any) => lines.push(`  - ${p}`));
      }
      lines.push("");
      lines.push("Design-to-Placement Instructions:");
      lines.push(String(designPlacementInstructions || ""));
      lines.push("");
      lines.push(`Need-By Date: ${dueDate || ""}`);
      lines.push("");
      lines.push("Extra Notes:");
      lines.push(String(notes || ""));
      lines.push("");
      lines.push(
        `Attached files: ${
          attachments.length > 0
            ? attachments.map((a) => a.filename).join(", ")
            : "None"
        }`
      );

      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: process.env.SMTP_TO || "timothy.shears@boltgangprinting.com",
        subject: `New Order from ${name || "Bolt Gang Customer"}`,
        text: lines.join("\n"),
        attachments,
      });

      return res.status(200).json({ ok: true });
    } catch (error) {
      console.error("Email send error:", error);
      return res.status(500).json({ error: "Failed to send email" });
    }
  });
}