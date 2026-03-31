export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="relative w-[30%] overflow-hidden bg-gray-950 flex items-center justify-center">
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage: `
              radial-gradient(900px 700px at 15% 20%, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.00) 60%),
              radial-gradient(800px 650px at 85% 35%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.00) 62%),
              radial-gradient(950px 720px at 45% 85%, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.00) 60%),
              linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.00) 55%)
            `,
          }}
        />

        <div className="absolute -bottom-44 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-white/10 opacity-40" />
        <div className="absolute -bottom-52 left-1/2 h-[680px] w-[680px] -translate-x-1/2 rounded-full border border-white/5 opacity-40" />

        <div className="flex items-center justify-center flex-col">
          <h1 className="mt-4 relative text-3xl font-semibold text-white tracking-wide">
            Notification Delivery App
          </h1>
        </div>
      </div>
      <div className="w-[70%] flex items-center justify-center">{children}</div>
    </div>
  );
}