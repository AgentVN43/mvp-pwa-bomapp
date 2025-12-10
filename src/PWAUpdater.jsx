// src/PWAUpdater.jsx
import { useRegisterSW } from "virtual:pwa-register/react";

export default function PWAUpdater() {
  const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
    onRegistered(r) {
      console.log("SW registered:", r);
    },
    onRegisterError(error) {
      console.error("SW registration error:", error);
    },
  });

  return (
    <div>
      {(offlineReady || needRefresh) && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-xl z-50 flex items-center gap-3">
          {offlineReady && <span>Ứng dụng đã sẵn sàng offline.</span>}

          {needRefresh && (
            <>
              <span>Có phiên bản mới.</span>
              <button
                className="underline ml-2"
                onClick={() => updateServiceWorker(true)}
              >
                Reload
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
