import { NextRequest, NextResponse } from "next/server";

const PLAN_DETAILS = {
  basic: {
    name: "NearMe Basic Plan",
    description: "Unlimited inquiries, full visibility, verified badge, listed in all results",
    amount: 19900, // centavos = PHP 199.00
  },
  pro: {
    name: "NearMe Pro Plan",
    description: "Featured placement, priority search, analytics dashboard, unlimited inquiries",
    amount: 39900, // PHP 399.00
  },
  premium: {
    name: "NearMe Premium Plan",
    description: "All premium features unlocked",
    amount: 69900, // example only
  },
} as const;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const plan = body?.plan as keyof typeof PLAN_DETAILS;

    if (!plan || !PLAN_DETAILS[plan]) {
      return NextResponse.json({ error: "Invalid plan selected." }, { status: 400 });
    }

    const selected = PLAN_DETAILS[plan];
    const secretKey = process.env.PAYMONGO_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json({ error: "Missing PAYMONGO_SECRET_KEY." }, { status: 500 });
    }

    const encodedKey = Buffer.from(secretKey + ":").toString("base64");

    const response = await fetch("https://api.paymongo.com/v1/checkout_sessions", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Basic ${encodedKey}`,
      },
      body: JSON.stringify({
        data: {
          attributes: {
            billing: {
              name: "NearMe Test User",
              email: "test@example.com",
              phone: "09171234567",
            },
            send_email_receipt: false,
            show_description: true,
            show_line_items: true,
            description: `${selected.name} subscription`,
            line_items: [
              {
                currency: "PHP",
                amount: selected.amount,
                name: selected.name,
                quantity: 1,
                description: selected.description,
              },
            ],
            payment_method_types: [
              "gcash",
              "grab_pay",
              "paymaya",
              "card",
            ],
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?payment=success&plan=${plan}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?payment=cancelled`,
            metadata: {
              plan,
              source: "billing-page",
            },
          },
        },
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: json?.errors?.[0]?.detail || "Failed to create checkout session." },
        { status: response.status }
      );
    }

    const checkoutUrl = json?.data?.attributes?.checkout_url;

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error("PayMongo checkout error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}