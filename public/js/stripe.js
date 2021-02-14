import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_51IKP7FLtAyPROcDjK2raOHJWSPJTFpiu7QvLfHCE4kieH4kMYf0p3osGfRtzci2g2oIHPDM5OMq1zn2VpAGtFgLt00tFhpDV8q');

export const bookTour = async (tourID) => {
  try {
    // 1 Get checkout session from Api
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourID}`
    );

    // 2 Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId:session.data.session.id
    });
  } catch (err) {
    showAlert('Erro',err);
  }
};
