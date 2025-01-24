package alfosan_javi.vitalnest.application.service_impl.payments;

import alfosan_javi.vitalnest.application.dto.payments.PaymentDTO;
import alfosan_javi.vitalnest.application.services.payments.PaymentService;
import alfosan_javi.vitalnest.domain.models.payments.Payment;
import alfosan_javi.vitalnest.domain.repos.payments.PaymentRepository;
import alfosan_javi.vitalnest.presentation.assemblers.payments.PaymentAssembler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PaymentAssembler paymentAssembler;

    @Override
    public List<PaymentDTO> getAllPayments() {
        return paymentRepository.findAll().stream()
                .map(paymentAssembler::toModel)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<PaymentDTO> getPaymentById(Long id) {
        return paymentRepository.findById(id)
                .map(paymentAssembler::toModel);
    }
}