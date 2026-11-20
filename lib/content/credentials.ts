import type { StaticImageData } from "next/image";
import africaHackon from "@/public/images/africahackon-badge.png";

/**
 * Certifications and badges shown on /about#education.
 * Names are as printed on each badge; years and the Credly link come from the previous site.
 */
export interface Credential {
  name: string;
  issuer: string;
  year: string;
  image: StaticImageData;
  credentialUrl?: string;
}

export const CREDENTIALS: Credential[] = [
  {
    name: "AH Cyber Swara-200",
    issuer: "Africa Hackon Academy",
    year: "2025",
    image: africaHackon,
    credentialUrl: "https://www.credly.com/badges/6f22cdbc-2228-4f69-893e-8ca1533bb9d0/public_url",
  },
];
