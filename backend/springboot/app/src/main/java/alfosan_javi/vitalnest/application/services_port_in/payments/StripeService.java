package alfosan_javi.vitalnest.application.services_port_in.payments;

import com.stripe.exception.StripeException;

public interface StripeService {
    String createPaymentIntent(int amount) throws StripeException;
}
