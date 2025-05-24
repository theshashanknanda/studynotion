const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {createCourse, getInstructorCourses, getAllCourses, getStudentCourses, updateCourseStatus, updateCourse, deleteCourse, addCourseToStudent, addCompletedLecture} = require('../controllers/courseController')
const {auth, isAdmin, isStudent, isInstructor} = require('../middlewares/auth')

router.post('/createCourse', auth, isInstructor, createCourse)
router.get('/getInstructorCourses', auth, getInstructorCourses)
router.get('/getAllCourses', auth, getAllCourses)
router.get('/getStudentCourses', auth, isStudent, getStudentCourses)
router.post('/updateCourseStatus', auth, updateCourseStatus)
router.put('/updateCourse', auth, updateCourse)
router.post('/deleteCourse', auth, deleteCourse)
router.post('/addCourseToStudent', auth, addCourseToStudent)
router.post('/addCompletedLecture', auth, addCompletedLecture)


router.post('/create-checkout-session', async (req, res) => {
    const { courseId, courseTitle, price } = req.body;
    const userId = req.user._id;
  
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: { name: courseTitle },
            unit_amount: price * 100,
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: 'http://localhost:3000/dashboard/enrolled-courses',
        cancel_url: 'http://localhost:3000/cancel',
        metadata: {
          userId,
          courseId,
        },
      });
  
      res.json({ id: session.id });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create checkout session' });
    }
  });
  
  router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
  
    try {
      const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const { userId, courseId } = session.metadata;
  
        await User.findByIdAndUpdate(userId, {
          $addToSet: { courses: courseId },
        });
      }
  
      res.status(200).end();
    } catch (err) {
      console.log(err.message);
      res.status(400).send(`Webhook error: ${err.message}`);
    }
  });
  

module.exports = router
