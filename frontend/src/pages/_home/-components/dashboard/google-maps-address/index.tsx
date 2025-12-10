import { env } from "@/env";

export const GoogleMapsAddress = () => {
  const lat = env.VITE_OPENMETEO_LAT;
  const lon = env.VITE_OPENMETEO_LON;

  const mapUrl = `https://www.google.com/maps?q=${lat},${lon}&output=embed`;

  return (
    <section className="h-120 min-w-80 flex-3 rounded-lg">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
};
