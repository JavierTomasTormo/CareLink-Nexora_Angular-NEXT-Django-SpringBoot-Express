package alfosan_javi.vitalnest.presentation.controllers_adapter_in.payments;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import com.stripe.exception.StripeException;
import alfosan_javi.vitalnest.application.services_port_in.payments.StripeService;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:4200")
public class StripeController {

    @Autowired
    private StripeService stripeService;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent(@RequestBody Map<String, Object> paymentRequest) {
        try {
            int amount = (Integer) paymentRequest.get("amount"); // El monto que se pasa en el body
            String clientSecret = stripeService.createPaymentIntent(amount);  // Pasa el monto directamente
            return ResponseEntity.ok(Map.of("clientSecret", clientSecret));  // Devuelve el clientSecret
        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}
