import ActivityCard from '../ActivityCard/ActivityCard';
import s from './ActivityCards.module.css';

export default function ActivityCards({activities}) {
	return (
		<div className={s.container}>
			{
				activities?.map((a) => 
					<ActivityCard 
						key={a.id} 
						name={a.name} 
						difficult={a.difficult} 
						duration={a.duration} 
						season={a.season}
					/>
				)
			}
		</div>
	)
}