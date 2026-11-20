import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="font-mono text-sm text-warn">404: no such file or directory</p>
      <h1 className="mt-3 text-3xl font-semibold text-fg">Page not found</h1>
      <p className="mt-3 max-w-xl text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Older case studies were replaced in a site
        update.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/case-studies" variant="secondary">
          Case studies
        </ButtonLink>
      </div>
    </Container>
  );
}
