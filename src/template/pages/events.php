<?php
	require_once "./src/bdd-conn.php";
?>

<main>
	<h1>Events</h1>
	
	<!-- <?php
		$reqEvent = $conn->prepare("SELECT * FROM event");
		$reqEvent->execute();
		$event = $reqEvent->fetchAll();

		for ($i = 0; $i < count($event) ; $i++) {
			// var_dump($event[$i]);
			$reqTitleEvent = $conn->prepare("SELECT titleEvent FROM event WHERE idEvent = ?");
			$reqTitleEvent->execute([1 + $i]);
			$titleEvent = $reqTitleEvent->fetchColumn();
			var_dump($titleEvent);

			$reqDateEvent = $conn->prepare("SELECT dateEvent FROM event WHERE idEvent = ?");
			$reqDateEvent->execute([1 + $i]);
			$dateEvent = $reqDateEvent->fetchColumn();
			var_dump($dateEvent);

				// DÉBUT CALCUL PLACE RESTANTE
			$reqSeatEvent = $conn->prepare("SELECT seatEvent FROM event WHERE idEvent = ?");
			$reqSeatEvent->execute([1 + $i]);
			$seatEvent = $reqSeatEvent->fetchColumn();
			// var_dump($seatEvent);

			$reqRegisterEvent = $conn->prepare("SELECT COUNT(idEvent) FROM register WHERE idEvent = ?");
			$reqRegisterEvent->execute([1 + $i]);
			$registerEvent = $reqRegisterEvent->fetchColumn();

			// var_dump($registerEvent);

			var_dump($seatEvent - $registerEvent);
				// FIN CALCUL PLACE RESTANTE

			$reqPlaceEvent = $conn->prepare("SELECT idPlace FROM event WHERE idEvent = ?");
			$reqPlaceEvent->execute([1 + $i]);
			$placeEvent = $reqPlaceEvent->fetchColumn();
			var_dump($placeEvent);

			echo "<br>";
		}
	?> -->

	<?php
	$idUser = $_SESSION["id"];
    


	$stmt = $conn->prepare("CALL getEventAndSeat(?);");
	$stmt->execute([$idUser]);
	$events = $stmt->fetchAll(PDO::FETCH_ASSOC);

	foreach ($events as $event) { ?>
		<div style="width:50%;margin:auto;display:flex;flex-direction:column;gap:1rem;margin-bottom:3rem;">
			<h2><?= $event["titleEvent"] ?></h2>
			<p style="font-size: 1rem;"><?= $event["descriptionEvent"] ?></p>
			<p style="font-size: 1.2rem;">Organized by <?= $event["nameOrganizer"] ?></p>
			<p>Available seat <?= $event["availableSeat"] ?></p>
			<?php
			$currentEvent = $event["idEvent"];
			if ($event["idUser"]) {
				echo "You are registered";
				echo "<button style='color:black;' id='unsubscribe-button' onclick='unsubscribe()'>Unsubscribe</button>";
			} else {
				echo "You are not registered";
				echo "<button style='color:black;'>Registration</button>";
			}
			?>
		</div>
	<?php
	}
	?>
</main>

<!--

BEGIN

SELECT 
e.idEvent, 
e.titleEvent, 
e.dateEvent, 
e.descriptionEvent, 
place.namePlace, 
organizer.nameOrganizer, 
register.idUser, 
(e.seatEvent - (SELECT COUNT(*) FROM register WHERE register.idEvent=e.idEvent)) as availableSeat FROM event as e 
JOIN place ON e.idPlace=place.idPlace 
JOIN organizer ON e.idOrganizer=organizer.idOrganizer 
LEFT JOIN register ON e.idEvent=register.idEvent AND register.idUser=idUser;

END

-->

<!-- unsubscribe()
DELIMITER $$

CREATE PROCEDURE  unsubscribe(currentUser INT, currentEvent INT);

BEGIN

DELETE FROM register WHERE register.idUser=currentUser AND register.idEvent=currentEvent;

END $$

DELIMITER ;
-->