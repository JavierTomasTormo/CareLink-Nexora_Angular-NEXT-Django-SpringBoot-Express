package alfosan_javi.vitalnest.application.service_impl.payments;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.exception.StripeException;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import alfosan_javi.vitalnest.application.services_port_in.payments.StripeService;

import javax.annotation.PostConstruct;

@Service
public class StripeServiceImpl implements StripeService {

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @PostConstruct
    public void init() {
        System.out.println("Stripe API Key (desde application.properties): " + stripeApiKey);
        Stripe.apiKey = stripeApiKey;  // Establece la clave de Stripe
    }

    @Override
    public String createPaymentIntent(int amount) throws StripeException {
        System.out.println("Usando Stripe API Key: " + Stripe.apiKey); // Verifica la clave antes de hacer la solicitud
        
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
            .setAmount((long) amount * 100)  // Convierte el monto a centavos
            .setCurrency("eur")        // Moneda
            .addPaymentMethodType("card") // Tipo de pago
            .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);
        return paymentIntent.getClientSecret();  // Retorna el client secret
    }

}