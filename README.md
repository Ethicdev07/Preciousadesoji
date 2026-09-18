# Precious Adesoji Portfolio

A responsive portfolio for Precious Adesoji, built with Next.js, TypeScript, GSAP, and Framer Motion.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## EmailJS setup for contact form

1. Copy `.env.example` to `.env.local`.
2. In EmailJS, create a service and email template.
3. Fill the values in `.env.local`:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

The contact form sends these template variables:
`user_name`, `user_email`, `reply_to`, `message`.

## Production check

```bash
npm run typecheck
npm run build
```
