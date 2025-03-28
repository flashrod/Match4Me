import TinderCard from "react-tinder-card";
import { useMatchStore } from "../store/useMatchStore";

const SwipeArea = () => {
	const { userProfiles, swipeRight, swipeLeft } = useMatchStore();

	const handleSwipe = (dir, user) => {
		if (dir === "right") swipeRight(user);
		else if (dir === "left") swipeLeft(user);
	};

	return (
		<div className='relative w-full max-w-sm h-[28rem]'>
			{userProfiles.map((user) => (
				<TinderCard
					className='absolute shadow-none'
					key={user._id}
					onSwipe={(dir) => handleSwipe(dir, user)}
					swipeRequirementType='position'
					swipeThreshold={100}
					preventSwipe={["up", "down"]}
				>
					<div
						className='card bg-gray-900 w-96 h-[28rem] select-none rounded-lg overflow-hidden border
					 border-gray-800'
					>
						<figure className='px-4 pt-4 h-3/4'>
							<img
								src={user.image || "/avatar.png"}
								alt={user.name}
								className='rounded-lg object-cover h-full pointer-events-none'
							/>
						</figure>
						<div className='card-body bg-gradient-to-b from-gray-900 to-black'>
							<h2 className='card-title text-2xl text-white'>
								{user.name}, {user.age}
							</h2>
							<p className='text-purple-300'>{user.bio}</p>
						</div>
					</div>
				</TinderCard>
			))}
		</div>
	);
};
export default SwipeArea;
