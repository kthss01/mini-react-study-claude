import { useState } from "react";
import "./Modal.css";

interface ModalProps {
	title: string;
	children: React.ReactNode;
}

const Modal = ({ title, children }: ModalProps): React.JSX.Element => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<div className="notice-box">
			<div className="notice-header">
				<p className="notice-title">{title}</p>

				{!isOpen && (
					<button
						className="notice-toggle-btn"
						onClick={(_e: React.MouseEvent<HTMLButtonElement>) =>
							setIsOpen(true)
						}
					>
						열기
					</button>
				)}

				{isOpen && (
					<button
						className="notice-toggle-btn"
						onClick={(_e: React.MouseEvent<HTMLButtonElement>) =>
							setIsOpen(false)
						}
					>
						닫기
					</button>
				)}
			</div>

			{isOpen && <div className="notice-content">{children}</div>}
		</div>
	);
};

export default Modal;
