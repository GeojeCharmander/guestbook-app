import { getEntries } from "@/lib/entries";
import { AdminProvider } from "./AdminProvider";
import AdminToggle from "./AdminToggle";
import ThemeToggle from "./ThemeToggle";
import GuestbookForm from "./GuestbookForm";
import GuestbookList from "./GuestbookList";

export default async function Home() {
  const entries = await getEntries();

  return (
    <AdminProvider>
      <main className="page">
        <div className="card">
          <div className="toolbar">
            <ThemeToggle />
            <AdminToggle />
          </div>

          <section className="gb-header">
            <span className="mark">✳</span>
            <h1>나의 방명록</h1>
            <p>다녀가신 분들의 마음을 여기에 남겨주세요</p>
          </section>

          <GuestbookForm />

          <div className="divider">
            <span>먼저 다녀간 분들</span>
          </div>

          <GuestbookList initialEntries={entries} />
        </div>
      </main>
    </AdminProvider>
  );
}
