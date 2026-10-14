"use client";

import type { FormEvent } from "react";

type WhatsAppContactFormProps = {
  displayPhone: string;
  whatsappNumber: string;
};

export function WhatsAppContactForm({
  displayPhone,
  whatsappNumber,
}: WhatsAppContactFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const modality = String(formData.get("modality") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const whatsappMessage = [
      `Olá, Talita. Meu nome é ${name}.`,
      `Tenho interesse em: ${modality}.`,
      `Gostaria de conversar sobre: ${message}`,
      "Preenchi estas informações pelo seu site",
    ].join("\n\n");

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="whatsapp-form" onSubmit={handleSubmit}>
      <div className="whatsapp-form__fields">
        <div className="form-field">
          <label htmlFor="contact-name">Como podemos chamar você?</label>
          <input
            autoComplete="name"
            id="contact-name"
            maxLength={80}
            name="name"
            required
            type="text"
          />
        </div>

        <div className="form-field">
          <label htmlFor="contact-modality">Qual modalidade interessa?</label>
          <select defaultValue="" id="contact-modality" name="modality" required>
            <option disabled value="">
              Selecione uma opção
            </option>
            <option value="psicoterapia individual online">
              Psicoterapia individual online
            </option>
            <option value="psicoterapia em grupo online">
              Psicoterapia em grupo online
            </option>
            <option value="conhecer melhor as modalidades">
              Quero conhecer as modalidades
            </option>
          </select>
        </div>

        <div className="form-field form-field--message">
          <label htmlFor="contact-message">O que você gostaria de saber?</label>
          <textarea
            id="contact-message"
            maxLength={700}
            name="message"
            required
            rows={5}
          />
        </div>
      </div>

      <label className="whatsapp-form__consent">
        <input name="consent" required type="checkbox" />
        <span>
          Concordo em abrir o WhatsApp e enviar estas informações diretamente
          para Talita
        </span>
      </label>

      <div className="whatsapp-form__footer">
        <p>
          Nada é enviado ou armazenado neste site. O WhatsApp abrirá em uma nova
          aba para você revisar a mensagem antes do envio
        </p>
        <button className="button button--solid" type="submit">
          <span>Abrir conversa no WhatsApp</span>
        </button>
      </div>

      <p className="whatsapp-form__phone">
        WhatsApp: <a href={`tel:+${whatsappNumber}`}>{displayPhone}</a>
      </p>
    </form>
  );
}
