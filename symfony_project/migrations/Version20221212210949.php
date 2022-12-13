<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221212210949 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE chatroom (id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE chatroom_user (chatroom_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_F475AE7DCAF8A031 (chatroom_id), INDEX IDX_F475AE7DA76ED395 (user_id), PRIMARY KEY(chatroom_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE message (id INT AUTO_INCREMENT NOT NULL, chatroom_id_id INT DEFAULT NULL, user_id_id INT DEFAULT NULL, INDEX IDX_B6BD307F5E898C9A (chatroom_id_id), INDEX IDX_B6BD307F9D86650F (user_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE chatroom_user ADD CONSTRAINT FK_F475AE7DCAF8A031 FOREIGN KEY (chatroom_id) REFERENCES chatroom (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE chatroom_user ADD CONSTRAINT FK_F475AE7DA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F5E898C9A FOREIGN KEY (chatroom_id_id) REFERENCES chatroom (id)');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F9D86650F FOREIGN KEY (user_id_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE chatroom_user DROP FOREIGN KEY FK_F475AE7DCAF8A031');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F5E898C9A');
        $this->addSql('DROP TABLE chatroom');
        $this->addSql('DROP TABLE chatroom_user');
        $this->addSql('DROP TABLE message');
        $this->addSql('ALTER TABLE user CHANGE username username VARCHAR(180) NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE roles roles LONGTEXT NOT NULL COLLATE `utf8mb4_unicode_ci` COMMENT \'(DC2Type:json)\', CHANGE password password VARCHAR(255) NOT NULL COLLATE `utf8mb4_unicode_ci`');
    }
}
