import React from "react";
import Accordion from "../Components/Accordion";

const Frequentlyasked = () => {
  return (
    <div className="min-h-screen mb-5">
      <div className=" max-w-5xl mx-10">
        <div className="p-4 bg-white rounded-lg">
          <Accordion
            title="How effective is e-learning?"
            answer="E-learning can help people retain more information than other learning methods, sometimes by as much as 60%. This is because online learning can use techniques like gamification, microlearning, and spaced repetition."
          />
          <Accordion
            title="Is e-learning cheap?"
            answer="E-learning can be cheaper than other forms of training because it can be delivered virtually, without the need to print materials or book venues. Learners can also use their own devices."
          />
          <Accordion
            title="How flexible is e-learning?"
            answer="E-learning can be more flexible than traditional learning, and it can be accessible to people worldwide."
          />
          <Accordion
            title="What makes eLearning successful?"
            answer="Use social media channels, forums and discussion boards to encourage excitement for the topic. Create a game to reward participants every time they complete a course. Probably one of the most critical factors for successful eLearning implementation is evaluation."
          />
          <Accordion
            title="What are the 3 main advantages of eLearning?"
            answer="Among the many benefits of online learning, you'll find that virtual education allows you to enjoy a more flexible schedule, can reduce the cost of your degree, and can allow you to more easily develop your career alongside furthering your education."
          />
          <Accordion
            title="What are the positive effects of eLearning?"
            answer="Less Impact on the Environment.

Online-based learning also consumes less power (up to 90% in fact), as well as less CO2 emissions in comparison to in-person campus-based educational systems. All in all, online learning helps reduce resource waste and the carbon footprint within the education industry."
          />
        </div>
      </div>
    </div>
  );
};

export default Frequentlyasked;
