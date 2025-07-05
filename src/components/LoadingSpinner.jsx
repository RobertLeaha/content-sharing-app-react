export default function LoadingSpinner({ message = "Se încarcă..." }) {
  return (
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
      <p className="text-sky-600">{message}</p>
    </div>
  );
}
