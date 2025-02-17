<?php declare(strict_types=1);

namespace Frosh\MailArchive\Content\MailArchive;

use Shopware\Core\Checkout\Customer\CustomerEntity;
use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;
use Shopware\Core\System\SalesChannel\SalesChannelEntity;

class MailArchiveEntity extends Entity
{
    use EntityIdTrait;

    protected array $sender;

    protected array $receiver;

    protected string $subject;

    protected ?string $plainText;

    protected ?string $htmlText;

    /**
     * @deprecated will not be filled anyone. Use emlPath instead
     */
    protected ?string $eml;

    protected ?string $emlPath;

    protected ?string $salesChannelId;

    protected ?SalesChannelEntity $salesChannel;

    protected ?string $customerId;

    protected ?CustomerEntity $customer;

    /** @var EntityCollection<MailArchiveAttachmentEntity>|null $attachments */
    protected ?EntityCollection $attachments = null;

    public function getSender(): array
    {
        return $this->sender;
    }

    public function setSender(array $sender): void
    {
        $this->sender = $sender;
    }

    public function getReceiver(): array
    {
        return $this->receiver;
    }

    public function setReceiver(array $receiver): void
    {
        $this->receiver = $receiver;
    }

    public function getSubject(): string
    {
        return $this->subject;
    }

    public function setSubject(string $subject): void
    {
        $this->subject = $subject;
    }

    public function getPlainText(): ?string
    {
        return $this->plainText;
    }

    public function setPlainText(?string $plainText): void
    {
        $this->plainText = $plainText;
    }

    public function getHtmlText(): ?string
    {
        return $this->htmlText;
    }

    public function setHtmlText(?string $htmlText): void
    {
        $this->htmlText = $htmlText;
    }

    /**
     * @deprecated Will not be filled anyone. Use emlPath instead
     */
    public function getEml(): ?string
    {
        return $this->eml;
    }

    /**
     * @deprecated should not be filled anyone. Save on disk and use emlPath instead
     */
    public function setEml(?string $eml): void
    {
        $this->eml = $eml;
    }

    public function getEmlPath(): ?string
    {
        return $this->emlPath;
    }

    public function setEmlPath(?string $emlPath): void
    {
        $this->emlPath = $emlPath;
    }

    public function getSalesChannelId(): ?string
    {
        return $this->salesChannelId;
    }

    public function setSalesChannelId(?string $salesChannelId): void
    {
        $this->salesChannelId = $salesChannelId;
    }

    public function getSalesChannel(): ?SalesChannelEntity
    {
        return $this->salesChannel;
    }

    public function setSalesChannel(?SalesChannelEntity $salesChannel): void
    {
        $this->salesChannel = $salesChannel;
    }

    public function getCustomerId(): ?string
    {
        return $this->customerId;
    }

    public function setCustomerId(?string $customerId): void
    {
        $this->customerId = $customerId;
    }

    public function getCustomer(): ?CustomerEntity
    {
        return $this->customer;
    }

    public function setCustomer(?CustomerEntity $customer): void
    {
        $this->customer = $customer;
    }

    /**
     * @return EntityCollection<MailArchiveAttachmentEntity>|null
     */
    public function getAttachments(): ?EntityCollection
    {
        return $this->attachments;
    }

    /**
     * @param EntityCollection<MailArchiveAttachmentEntity> $attachments
     */
    public function setAttachments(EntityCollection $attachments): void
    {
        $this->attachments = $attachments;
    }
}
