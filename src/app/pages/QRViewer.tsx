import { useParams, Link } from "react-router";
import { QrCode, ArrowLeft, Download } from "lucide-react";

export default function QRViewer() {
  const { ticketId } = useParams();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <div className="bg-card rounded-2xl border border-border p-8 shadow-xl">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <QrCode className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-lg font-bold text-foreground mb-1">Ticket QR Code</h1>
          <p className="text-xs text-muted-foreground mb-6 font-mono">{ticketId}</p>

          {/* QR placeholder */}
          <div className="w-48 h-48 bg-muted rounded-xl mx-auto mb-6 flex items-center justify-center border border-border">
            <QrCode className="w-24 h-24 text-foreground/30" />
          </div>

          <div className="space-y-3">
            <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition">
              <Download className="w-4 h-4" /> Download QR
            </button>
            <Link to="/college" className="w-full py-2.5 border border-border rounded-xl text-sm font-medium text-foreground flex items-center justify-center gap-2 hover:bg-muted transition">
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
