package com.job_offer.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.job_offer.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);

  Optional<User> findSuserByEmail(String email);

  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);
}