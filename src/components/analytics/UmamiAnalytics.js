import { Suspense } from "react";

import UmamiClient from "./UmamiClient";

export default function UmamiAnalytics() {
  return (
    <Suspense fallback={null}>
      <UmamiClient />
    </Suspense>
  );
}
