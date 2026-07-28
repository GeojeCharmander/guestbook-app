"use client";

import { useEffect, useState } from "react";
import GuestbookCard from "./GuestbookCard";
import { getVisitorToken } from "@/lib/visitor";
import type { GuestbookEntry } from "@/lib/entries";

export default function GuestbookList({
  initialEntries,
}: {
  initialEntries: GuestbookEntry[];
}) {
  const [entries, setEntries] = useState(initialEntries);
  const [visitorToken, setVisitorToken] = useState("");

  useEffect(() => {
    setVisitorToken(getVisitorToken());
  }, []);

  useEffect(() => {
    setEntries(initialEntries);
  }, [initialEntries]);

  function handleDeleted(id: string) {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  }

  if (entries.length === 0) {
    return <p className="empty">아직 남긴 메시지가 없어요. 첫 인사를 남겨보세요!</p>;
  }

  return (
    <ul className="gb-list">
      {entries.map((entry) => (
        <GuestbookCard
          key={entry.id}
          entry={entry}
          isMine={Boolean(visitorToken) && entry.authorToken === visitorToken}
          visitorToken={visitorToken}
          onDeleted={handleDeleted}
        />
      ))}
    </ul>
  );
}
