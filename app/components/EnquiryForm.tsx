'use client';
import { useState } from 'react';

export default function EnquiryForm() {
  const [status, setStatus] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('Sent successfully!');
      } else {
        setStatus('Failed to send.');
      }
    } catch {
      setStatus('Error.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" placeholder="Your name" required className="w-full p-2 border" />
      <input name="email" type="email" placeholder="Your email" required className="w-full p-2 border" />
      <textarea name="message" placeholder="Your message" required className="w-full p-2 border" />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white">Submit</button>
      {status && <p>{status}</p>}
    </form>
  );
}
