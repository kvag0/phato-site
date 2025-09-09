// src/components/organisms/Footer.tsx

import Link from "next/link";
import Container from "../molecules/Container";

const footerNav = [
    { name: "Carreiras", href: "#" },
    { name: "Contacto", href: "#" },
    { name: "Imprensa", href: "#" },
];

/**
 * The main site footer component.
 * Includes secondary navigation and copyright information.
 */
export default function Footer() {
    return (
        <footer className="mt-auto w-full border-t border-phato-ui/20">
            <Container className="flex flex-col items-center justify-between gap-6 py-12 md:flex-row">
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 md:justify-start">
                    {footerNav.map((item) => (
                        <Link key={item.name} href={item.href} className="text-sm text-phato-text hover:text-phato-light transition-colors">
                            {item.name}
                        </Link>
                    ))}
                </div>
                <p className="text-center text-xs text-phato-ui md:text-left">
                    &copy; {new Date().getFullYear()} Phato Technologies Inc. Todos os direitos reservados.
                </p>
            </Container>
        </footer>
    );
}
