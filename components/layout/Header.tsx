"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/navigation";
import { talita } from "@/data/talita";
import { MagneticLink } from "@/components/motion/MagneticLink";

export function Header() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<"light" | "dark">("light");
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const sentinel = document.querySelector("[data-header-threshold]");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setCompact(!entry.isIntersecting),
      { rootMargin: "-88px 0px 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scenes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-header-tone]"),
    );
    if (!scenes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries.find((entry) => entry.isIntersecting);
        if (!(active?.target instanceof HTMLElement)) return;
        setTone(active.target.dataset.headerTone === "dark" ? "dark" : "light");
      },
      { rootMargin: "-14% 0px -85% 0px", threshold: 0 },
    );

    scenes.forEach((scene) => observer.observe(scene));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;

    if (open && !element.open) {
      element.showModal();
      element.querySelector<HTMLElement>("a")?.focus();
    }

    if (!open && element.open) element.close();
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="site-header" data-compact={compact} data-tone={tone}>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <div className="site-header__inner">
        <a aria-label="Talita F. Nolasco, início" className="wordmark" href="#inicio">
          <Image
            alt=""
            className="brand-logo brand-logo--header"
            height={289}
            loading="eager"
            sizes="(max-width: 900px) 128px, 176px"
            src="/images/Logo.png"
            unoptimized
            width={864}
          />
        </a>

        <nav aria-label="Navegação principal" className="desktop-nav">
          {navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-action">
          <MagneticLink href={talita.contact.schedulingHref} variant="outline">
            Agendar atendimento
          </MagneticLink>
        </div>

        <button
          aria-controls="mobile-menu"
          aria-expanded={open}
          className="menu-toggle"
          onClick={() => setOpen(true)}
          type="button"
        >
          <span aria-hidden="true" />
          <span className="sr-only">Abrir menu</span>
          Menu
        </button>
      </div>

      <dialog
        aria-label="Menu de navegação"
        className="mobile-menu"
        id="mobile-menu"
        onCancel={closeMenu}
        onClose={() => setOpen(false)}
        ref={dialog}
      >
        <div className="mobile-menu__top">
          <span className="wordmark wordmark--menu" aria-hidden="true">
            <Image
              alt=""
              className="brand-logo brand-logo--menu"
              height={289}
              loading="eager"
              sizes="140px"
              src="/images/Logo.png"
              unoptimized
              width={864}
            />
          </span>
          <button onClick={closeMenu} type="button">
            Fechar
          </button>
        </div>
        <nav aria-label="Navegação móvel">
          {navigation.map((item) => (
            <a href={item.href} key={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>
        <p>Psicoterapia individual e em grupo, em formato online.</p>
      </dialog>
    </header>
  );
}

