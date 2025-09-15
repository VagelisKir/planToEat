import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Unauthorized</h1>
          <p className="text-muted-foreground text-balance">
            You do not have permission to access this page.
          </p>
          <button className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
            <Link href="/">Go to Home</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
