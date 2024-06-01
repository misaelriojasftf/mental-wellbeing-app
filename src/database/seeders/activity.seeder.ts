import { connectionSource } from '../../../orm.config';
import { Activity } from '../../activity/activity.entity';
import { ActivityCategory } from '../../activity/activity.enum';

type ActivitySeedIn = Omit<Activity, 'id' | 'createdAt' | 'userActivities'>;

const activitiesData: ActivitySeedIn[] = [
    {
        title: "Take a Relaxing Bath",
        description: "Draw a warm bath with your favorite scents and essential oils. Light some candles and put on calming music. Soak for at least 20 minutes, letting your worries melt away.",
        category: ActivityCategory.RELAXATION,
        duration: 30,
        difficulty: "Easy",
        content: "Taking a relaxing bath is a simple yet effective way to unwind and de-stress. The warm water helps to loosen muscles, while the aromatherapy can promote feelings of calm and well-being. Additionally, the quiet time allows you to focus on your breath and clear your mind."
    },
    {
        title: "Practice Mindfulness Meditation",
        description: "Find a quiet space where you won't be interrupted. Sit comfortably with your back straight and close your eyes. Focus on your breath, feeling the rise and fall of your chest. If your mind wanders, gently bring your attention back to your breath.",
        category: ActivityCategory.RELAXATION,
        duration: 15,
        difficulty: "Easy",
        content: "Mindfulness meditation is a practice of focusing your attention on the present moment. It can help to reduce stress, improve focus, and promote feelings of calm. There are many different mindfulness meditation techniques, so you can find one that works best for you."
    },
    {
        title: "Go for a Walk in Nature",
        description: "Find a park, trail, or green space near you. Immerse yourself in the sights and sounds of nature. Notice the trees, flowers, birds, and other elements of the environment. Take deep breaths of fresh air and allow yourself to relax.",
        category: ActivityCategory.RELAXATION,
        duration: 30,
        difficulty: "Easy",
        content: "Spending time in nature has been shown to have a number of mental health benefits, including reducing stress, anxiety, and depression. Immersing yourself in nature can help you to feel more connected to the world around you and promote feelings of peace and well-being."
    },
    {
        title: "Write in a Gratitude Journal",
        description: "Take a few minutes each day to write down three things you are grateful for. This can be anything from your health and family to a beautiful sunset or a delicious meal. Focusing on the positive aspects of your life can help to improve your mood and overall well-being.",
        category: ActivityCategory.SELF_ESTEEM,
        duration: 10,
        difficulty: "Easy",
        content: "Practicing gratitude is a simple yet powerful way to boost your self-esteem. By focusing on the good things in your life, you can start to appreciate yourself and your accomplishments more."
    },
    {
        title: "Do Something You're Good At",
        description: "Take some time to do something that you're good at, whether it's playing a musical instrument, painting, writing, cooking, or anything else. When you engage in activities that you excel at, it can boost your confidence and self-esteem.",
        category: ActivityCategory.SELF_ESTEEM,
        duration: 30,
        difficulty: "Easy",
        content: "Engaging in activities that you're good at can be a great way to boost your self-esteem. When you can see your own competence and skill, it can help you to feel more confident in yourself and your abilities."
    },
    {
        title: "Learn a New Skill",
        description: "Challenge yourself by learning a new skill. This could be anything from learning a new language to playing a musical instrument to taking up a new hobby. Learning something new can help to keep your mind sharp, boost your confidence, and give you a sense of accomplishment.",
        category: ActivityCategory.SELF_ESTEEM,
        duration: 60,
        difficulty: "Medium",
        content: "Learning a new skill is a great way to challenge yourself and step outside your comfort zone. It can also help to boost your confidence and self-esteem as you master new skills and knowledge."
    }
];

connectionSource.initialize()
    .then(async () => {
        const activityRepository = connectionSource.getRepository(Activity);

        for (const activityData of activitiesData) {
            const existingActivity = await activityRepository.findOneBy({ title: activityData.title });
            if (!existingActivity) {
                const activity = activityRepository.create(activityData);
                await activityRepository.save(activity);
            }
        }

        console.log('Seeding completed!');
        process.exit(0);
    })
    .catch(error => {
        console.error('Error during seeding:', error);
        process.exit(1);
    });
