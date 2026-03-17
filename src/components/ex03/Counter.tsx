import { useState } from "react";
import "./Counter.css";

type CounterProps = {
	step?: number;
};

const Counter = ({ step = 1 }: CounterProps): React.JSX.Element => {
	const [count, setCount] = useState<number>(0);

	return (
		<div className="counter">
			<div className="counter__controls">
				<button
					className="counter__button counter__button--minus"
					onClick={(_e: React.MouseEvent<HTMLButtonElement>) =>
						setCount((prev) => Math.max(0, prev - step))
					}
				>
					[ - ]
				</button>
				<input
					className="counter__input"
					type="number"
					value={count}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						const cnt: number = Number(e.target.value);
						if (!isNaN(cnt)) setCount(cnt);
					}}
				/>

				<button
					className="counter__button counter__button--plus"
					onClick={(_e: React.MouseEvent<HTMLButtonElement>) =>
						setCount((prev) => prev + step)
					}
				>
					[ + ]
				</button>
				<button
					className="counter__button counter__button--reset"
					onClick={(_e: React.MouseEvent<HTMLButtonElement>) =>
						setCount(0)
					}
				>
					[ 리셋 ]
				</button>
			</div>
			<p className="counter__step">step: [ {step} ]</p>
		</div>
	);
};

export default Counter;
