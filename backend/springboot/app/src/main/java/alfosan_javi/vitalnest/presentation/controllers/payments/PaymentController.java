package alfosan_javi.vitalnest.presentation.controllers.payments;

import alfosan_javi.vitalnest.application.dto.payments.PaymentDTO;
import alfosan_javi.vitalnest.application.services.payments.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping
    public List<PaymentDTO> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/{id}")
    public Optional<PaymentDTO> getPaymentById(@PathVariable Long id) {
        return paymentService.getPaymentById(id);
    }
}