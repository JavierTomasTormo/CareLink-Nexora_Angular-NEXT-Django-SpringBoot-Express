package alfosan_javi.vitalnest.application.service_impl.payments;

import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.exception.StripeException;
import com.stripe.param.PaymentIntentCreateParams;  // IMPORTA ESTA CLASE
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
        System.out.println("Stripe API Key: " + stripeApiKey); // Esto imprimirá la clave de API al iniciar la aplicación
        Stripe.apiKey = stripeApiKey;  // Establece la clave de Stripe
    }

    @Override
    public String createPaymentIntent(int amount) throws StripeException {
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
            .setAmount((long) amount)  // Convierte el monto a long (Stripe usa centavos)
            .setCurrency("eur")        // Moneda
            .addPaymentMethodType("card") // Tipo de pago
            .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);
        return paymentIntent.getClientSecret();  // Retorna el client secret
    }
}
