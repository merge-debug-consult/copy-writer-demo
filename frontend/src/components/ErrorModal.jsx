export default function ErrorModal({ onClose }) {
  return (
    <div className="error-modal-backdrop" onClick={onClose}>
      <div className="error-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Server Sleeping</h3>
        <p>
          The backend is currently switched off to save resources.
          Drop me a message and I'll fire it back up for you:
        </p>
        <a className="error-modal-contact" href="tel:+447710243033">
          07710 243 033 — Ben
        </a>
        <button className="error-modal-close" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
