import { useState } from "react";
import "./Modal.css";

interface ModalProps {
	title: string;
	children: React.ReactNode;
}

const Modal = ({ title, children }: ModalProps): React.JSX.Element => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<div className="modal-box">
			<div className="modal-header">
				<p className="modal-title">{title}</p>

				<button
					className="modal-toggle-btn"
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? "닫기" : "열기"}
				</button>
			</div>

			{isOpen && <div className="modal-content">{children}</div>}
		</div>
	);
};

export default Modal;
