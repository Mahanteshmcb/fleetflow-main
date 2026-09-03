import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Truck, CheckCircle2 } from "lucide-react";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { Modal } from "../components/common/Modal";
import { isValidEmail, isNonEmpty } from "../utils/validators";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [forgotOpen, setForgotOpen] = useState(false);

  function validate(): boolean {
    const next: { email?: string; password?: string } = {};
    if (!isNonEmpty(email)) {
      next.email = "Please enter your email.";
    } else if (email.includes("@") && !isValidEmail(email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!isNonEmpty(password)) {
      next.password = "Please enter your password.";
    } else if (password.length < 6) {
      next.password = "Password must contain at least 6 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) navigate("/dashboard");
  }

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Left panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-navy-950 px-12 py-12 text-white lg:flex xl:px-16">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 font-bold">F</div>
          <span className="text-lg font-semibold tracking-tight">FleetLane</span>
        </div>

        <div className="max-w-md">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight xl:text-4xl">
            Smart fleet management, simplified.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-white/60">
            Monitor your vehicles, tyres and maintenance from one intelligent workspace.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            {["Complete vehicle visibility", "Tyre lifecycle management", "Maintenance tracking"].map((b) => (
              <div key={b} className="flex items-center gap-2.5 text-[14px] text-white/85">
                <CheckCircle2 size={17} className="shrink-0 text-brand-300" />
                {b}
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
            <TruckIllustration />
          </div>
        </div>

        <p className="text-xs text-white/35">© 2026 FleetLane. Fleet operations, made simple.</p>
      </div>

      {/* Right panel */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 font-bold text-white">F</div>
            <span className="text-base font-semibold text-navy-900">FleetLane</span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-navy-900">Welcome back</h2>
          <p className="mt-1.5 text-[14px] text-navy-500">Sign in to manage your fleet</p>

          <form className="mt-7 flex flex-col gap-4" onSubmit={handleSignIn} noValidate>
            <Input
              label="Email / Username"
              type="text"
              placeholder="you@FleetLane.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              autoComplete="username"
            />
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                autoComplete="current-password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-[34px] text-navy-500 hover:text-navy-700"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            <button type="button" onClick={() => setForgotOpen(true)} className="self-end text-[13px] font-medium text-brand-500 hover:text-brand-600">
              Forgot password?
            </button>

            <Button type="submit" variant="primary" className="mt-1 w-full">
              Sign In
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-navy-900/10" />
            <span className="text-xs font-medium text-navy-400">OR</span>
            <div className="h-px flex-1 bg-navy-900/10" />
          </div>

          <Button variant="secondary" className="w-full" onClick={() => navigate("/dashboard")}>
            <GoogleIcon />
            Continue with Google
          </Button>

          <p className="mt-8 text-center text-xs text-navy-400">
            Prototype credentials: any valid-looking email and a 6+ character password will sign you in.
          </p>
        </div>
      </div>

      <Modal open={forgotOpen} onClose={() => setForgotOpen(false)} title="Password recovery">
        <p className="text-sm text-navy-600">Password recovery is disabled in this prototype.</p>
        <Button variant="primary" className="mt-5 w-full" onClick={() => setForgotOpen(false)}>
          Got it
        </Button>
      </Modal>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" className="mr-1">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.4 0 10.3-2.1 14-5.4l-6.5-5.4C29.4 34.9 26.8 36 24 36c-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.6 39.6 16.3 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.5 5.4C40.9 36.4 44 30.8 44 24c0-1.3-.1-2.7-.4-3.5z" />
    </svg>
  );
}

function TruckIllustration() {
  return (
    <svg viewBox="0 0 240 100" className="w-full">
      <rect x="8" y="30" width="120" height="42" rx="6" fill="#8DAEFF" fillOpacity="0.25" stroke="#8DAEFF" strokeWidth="1.5" />
      <rect x="128" y="14" width="60" height="58" rx="6" fill="#5C87F5" fillOpacity="0.3" stroke="#8DAEFF" strokeWidth="1.5" />
      <rect x="140" y="24" width="36" height="20" rx="3" fill="#DCE7FF" fillOpacity="0.4" />
      {[28, 68, 148, 178].map((cx, i) => (
        <g key={i}>
          <circle cx={cx} cy="80" r="11" fill="#0B1220" />
          <circle cx={cx} cy="80" r="5" fill="#8DAEFF" />
        </g>
      ))}
    </svg>
  );
}
