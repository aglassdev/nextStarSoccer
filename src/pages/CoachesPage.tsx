import Navigation from '../components/layout/Navigation';

const CoachesPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <div className="pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-8 font-lt-wave">
            Our Coaches
          </h1>
          <p className="text-lg text-gray-400 text-center font-lt-wave">
            Meet our team of experienced coaches and ex-pros.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoachesPage;
