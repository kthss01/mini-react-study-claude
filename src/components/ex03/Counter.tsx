import { useState } from "react";
import "./Counter.css";

type CounterProps = {
	step?: number;
};

const Counter = ({ step = 1 }: CounterProps) => {
	const [count, setCount] = useState<number>(0);

	return (
		<div className="counter">
			<div className="counter__controls">
				<button
					className="counter__button counter__button--minus"
					onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
						setCount(count - step < 0 ? 0 : count - step)
					}
				>
					[ - ]
				</button>
				<input
					className="counter__input"
					type="number"
					value={count}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setCount(e.target.valueAsNumber)
					}
				/>

				<button
					className="counter__button counter__button--plus"
					onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
						setCount(count + step)
					}
				>
					[ + ]
				</button>
				<button
					className="counter__button counter__button--reset"
					onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
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
