import { NextResponse } from "next/server";
import { submitGiftAid } from "@/lib/coda";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.giftAidDeclaration) {
      return NextResponse.json(
        { error: "Gift Aid declaration must be confirmed." },
        { status: 400 }
      );
    }

    const codaData = {
      "c-gfaXo6Po9t": data.firstName, // First Name
      "c-7TuU4epkiR": data.lastName, // Last Name
      "c-QF_IUnYM74": data.homeAddress, // Home Address
      "c-rBJJjTrwBr": data.city, // City
      "c-ivEW2YMZ2C": data.postCode, // Post Code
      "c-HAcO7l02ik": data.country, // Country
      "c-U5iQkoq6v1": data.phone, // Phone
      "c-dK6HZsV2ho": data.email, // Email Address
      "c-OWzhmgvk8N": Boolean(data.giftAidDeclaration), // GIFT AID DECLARATION
    };

    await submitGiftAid(codaData);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Coda Gift Aid Submission Error:", error);
    const message = error instanceof Error ? error.message : "Submission failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
