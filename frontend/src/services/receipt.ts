import { supabase } from "./supabase";
import { File } from "expo-file-system";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000/api";

export type ReceiptItem = { item: string; price: number };

/**
 * Upload a local image URI to Supabase Storage and return the public URL.
 */
export async function uploadReceiptImage(localUri: string): Promise<string> {
  // Use expo-file-system's File class which supports .arrayBuffer() natively in RN
  const file = new File(localUri);
  const arrayBuffer = await file.arrayBuffer();

  const fileName = `receipt_${Date.now()}.jpg`;

  const { data, error } = await supabase.storage
    .from("receipts")
    .upload(fileName, arrayBuffer, {
      contentType: "image/jpeg",
      upsert: false,
    });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("receipts").getPublicUrl(data.path);

  return publicUrl;
}

/**
 * Call the backend AI service to analyze a receipt image.
 * Returns an array of { item, price }.
 */
export async function analyzeReceipt(imageUrl: string): Promise<ReceiptItem[]> {
  const response = await fetch(
    `${API_URL}/receipts/?image_url=${encodeURIComponent(imageUrl)}`,
    { method: "POST" },
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(
      (err as Record<string, string>).detail || "Failed to analyze receipt",
    );
  }

  return await response.json();
}

/**
 * Upload a receipt image and analyze it in one step.
 */
export async function scanReceipt(
  localUri: string,
): Promise<{ imageUrl: string; items: ReceiptItem[] }> {
  const imageUrl = await uploadReceiptImage(localUri);
  const items = await analyzeReceipt(imageUrl);
  return { imageUrl, items };
}
