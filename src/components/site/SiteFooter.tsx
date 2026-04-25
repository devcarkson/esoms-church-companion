import { Cross, Mail, Phone, MapPin } from "lucide-react";

export const SiteFooter = () => {
  return (
    <footer className="relative border-t border-border bg-card">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-bubble">
                <Cross className="h-4 w-4" />
              </span>
              <span className="font-display text-xl font-semibold text-foreground">
                ESOMS <span className="text-primary">Church</span>
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              A faith-centered community committed to spiritual growth, pastoral care
              and meaningful service across Lagos and beyond.
            </p>
            <p className="mt-6 font-display text-lg italic text-primary">
              "Come to me, all you who are weary and burdened, and I will give you rest."
            </p>
            <p className="text-xs text-muted-foreground">— Matthew 11:28</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Visit</p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> 62B Rufai Street, Surulere, Lagos</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> 0802 300 7053</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> hello@esoms.church</li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Explore</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                ["About", "#about"],
                ["Services", "#services"],
                ["Ministries", "#ministries"],
                ["Events", "#events"],
                ["Parishes", "#parishes"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="text-muted-foreground transition-colors hover:text-primary">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} ESOMS Church. Made with love. 💛</p>
          <p>Standing in prayer with you, always.</p>
        </div>
      </div>
    </footer>
  );
};
