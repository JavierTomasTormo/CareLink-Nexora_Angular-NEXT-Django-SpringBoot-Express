package alfosan_javi.vitalnest.infrastructure.jpa.repo_impl_adapter_out.payments;

import alfosan_javi.vitalnest.domain.models.payments.Payment;
import alfosan_javi.vitalnest.domain.repos_port_out.payments.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class PaymentRepositoryImpl implements PaymentRepository {

    @Autowired
    private JpaPaymentRepository jpaPaymentRepository;

    @Override
    public List<Payment> findAll() {
        return jpaPaymentRepository.findAll();
    }

    @Override
    public Optional<Payment> findById(Long id) {
        return jpaPaymentRepository.findById(id);
    }

    @Override
    public Payment save(Payment payment) {
        return jpaPaymentRepository.save(payment);
    }

    @Override
    public void deleteById(Long id) {
        jpaPaymentRepository.deleteById(id);
    }
}