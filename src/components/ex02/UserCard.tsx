type UserCardProps = {
	name: string;
	email: string;
	age?: number;
	isAdmin?: boolean;
	bio?: string;
};

const UserCard = ({
	name,
	email,
	age,
	isAdmin,
	bio,
}: UserCardProps): React.JSX.Element => {
	return (
		<div>
			<p>
				[{name}]{isAdmin && " (관리자)"}
			</p>
			<p>나이: {age != undefined ? `${age}세` : "정보 없음"}</p>
			<p>이메일: {email}</p>
			{bio && <p>자기소개: {bio}</p>}
		</div>
	);
};

export default UserCard;
